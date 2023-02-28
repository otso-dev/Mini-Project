package main;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import dto.request.RequestDto;
import dto.response.ResponseDto;
import entity.Room;
import lombok.Getter;

@Getter
public class ConectedSocket extends Thread {
	private static List<ConectedSocket> conectedSocketList = new ArrayList<>();
	private static List<Room> roomList = new ArrayList<>();
	private static int index = 0;

	private Socket socket;
	private String username;

	private Gson gson;

	public ConectedSocket(Socket socket) {
		this.socket = socket;
		gson = new Gson();

		Room room = new Room("testroom" + index, "testuser" + index);
		index++;
		roomList.add(room);
	}

	@Override
	public void run() {
		while (true) {
			BufferedReader bufferedReader;
			try {
				bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
				String requestJson = bufferedReader.readLine();
				System.out.println("요청: " + requestJson);
				requestMapping(requestJson);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	private void requestMapping(String requestJson) {
		RequestDto<?> requestDto = gson.fromJson(requestJson, RequestDto.class);

		switch (requestDto.getResource()) {
		case "usernameCheck":
			checkUsername((String) requestDto.getBody());
			break;
		case "createRoom":
			Room room = new Room((String) requestDto.getBody(), username);
			room.getUsers().add(this);
			roomList.add(room);
			ResponseDto<String> responseDto = new ResponseDto<String>("createRoomSuccessfully", null);
			sendToMe(responseDto);
			refreshUsernameList(username);
			sendToAll(refreshRoomList(), conectedSocketList);
			break;
		}
	}

	private void checkUsername(String username) {
		if (username.isBlank()) {
			sendToMe(new ResponseDto<String>("usernameCheckisBlank", "사용자이름은 공백일 수 없습니다."));
			return;
		}

		for (ConectedSocket conectedSocket : conectedSocketList) {
			if (conectedSocket.getUsername().equals(username)) {
				sendToMe(new ResponseDto<String>("usernameCheckisDuplicate", "이미 사용중인 이름입니다."));
				return;
			}
		}

		this.username = username;
		conectedSocketList.add(this);
		sendToMe(new ResponseDto<String>("usernameCheckSuccessfully", null));
		sendToMe(refreshRoomList());
	}

	private ResponseDto<List<Map<String, String>>> refreshRoomList() {
		List<Map<String, String>> roomNameList = new ArrayList<>();
		for (Room room : roomList) {
			Map<String, String> roominfo = new HashMap<>();
			roominfo.put("roomName", room.getRoomName());
			roominfo.put("owner", room.getOwner());
			roomNameList.add(roominfo);
		}
		ResponseDto<List<Map<String, String>>> responseDto = new ResponseDto<List<Map<String, String>>>(
				"refreshRoomList", roomNameList);
		return responseDto;
	}

	private Room findConnectedRoom(String username) {
		Room room = null;
		for (Room r : roomList) {
			
			for (ConectedSocket cs : r.getUsers()) {
				if (cs.getUsername().equals(username)) {
					return r;
				}
			}
		}
		return null;
	}
	
	private Room findRoom(Map<String,String>roominfo) {
		for(Room room : roomList) {
			if(room.getRoomName().equals(roominfo.get("roomName"))
					&& room.getOwner().equals(roominfo.get("owner"))) {
				return room;
			}
		}
		return null;
	}

	private void refreshUsernameList(String username) {
		Room room = findConnectedRoom(username);
		List<String> usernameList = new ArrayList<>();
		usernameList.add("방 제목: " + room.getRoomName());
		for(ConectedSocket conectedSocket : room.getUsers()) {
			if(conectedSocket.getUsername().equals(room.getOwner())) {
				usernameList.add(conectedSocket.getUsername() +  "(방장)");
				continue;
			}
			usernameList.add(conectedSocket.getUsername());
		}
		ResponseDto<List<String>> responseDto = new ResponseDto<List<String>>("refreshUserList", usernameList);
		sendToAll(responseDto,room.getUsers());
	}

	private void sendToMe(ResponseDto<?> responseDto) {

		try {
			OutputStream outputStream = socket.getOutputStream();
			PrintWriter printWriter = new PrintWriter(outputStream, true);

			String responseJson = gson.toJson(responseDto);
			printWriter.println(responseJson);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	private void sendToAll(ResponseDto<?> responseDto, List<ConectedSocket> conectedSockets) {
		for (ConectedSocket conectedSocket : conectedSockets) {
			try {
				OutputStream outputStream = conectedSocket.getSocket().getOutputStream();
				PrintWriter printWriter = new PrintWriter(outputStream, true);

				String responseJson = gson.toJson(responseDto);
				printWriter.println(responseJson);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

}
