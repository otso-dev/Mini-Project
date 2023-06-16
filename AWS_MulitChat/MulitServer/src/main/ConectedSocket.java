package main;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.SocketException;
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
	}

	@Override
	public void run() {
		BufferedReader bufferedReader;
		try {
			while (true) {
				bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
				String requestJson = bufferedReader.readLine();
				System.out.println("요청: " + requestJson);
				requestMapping(requestJson);
			}

		}catch (SocketException e) {
			conectedSocketList.remove(this);
			System.out.println(username + ": 클라이언트 종료");
		} catch (IOException e) {
			
			e.printStackTrace();
		}

	}

	private void requestMapping(String requestJson) {
		RequestDto<?> requestDto = gson.fromJson(requestJson, RequestDto.class);
		
		Room room = null;
		
		switch (requestDto.getResource()) {
		case "usernameCheck":
			checkUsername((String) requestDto.getBody());
			break;
		case "createRoom":
			room = new Room((String) requestDto.getBody(), username);
			room.getUsers().add(this);
			roomList.add(room);
			sendToMe(new ResponseDto<String>("createRoomSuccessfully", null));
			refreshUsernameList(room);
			sendToAll(refreshRoomList(), conectedSocketList);
			break;
		case"enterRoom":
			room = findRoom((Map<String,String>)requestDto.getBody());
			room.getUsers().add(this);
			sendToMe(new ResponseDto<String>("enterRoomSuccessfully", null));
			refreshUsernameList(room);
			break;
		case "sendMessage":
			room = findConnectedRoom(username);
			sendToAll(new ResponseDto<String>("receiveMessage", username + ">>>" + (String)requestDto.getBody()), room.getUsers());
			break;
			
		case"exitRoom":
			room = findConnectedRoom(username);
			try {
				if(room.getOwner().equals(username)) {
					exitRoomAll(room);
				}else {
					exitRoom(room);
				}
			} catch (NullPointerException e) {
				System.out.println("클라이언트 강제 종료");
			}
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

	private Room findRoom(Map<String, String> roominfo) {
		for (Room room : roomList) {
			if (room.getRoomName().equals(roominfo.get("roomName")) && room.getOwner().equals(roominfo.get("owner"))) {
				return room;
			}
		}
		return null;
	}

	private void refreshUsernameList(Room room) {
		
		List<String> usernameList = new ArrayList<>();
		usernameList.add("방 제목: " + room.getRoomName());
		for (ConectedSocket conectedSocket : room.getUsers()) {
			if (conectedSocket.getUsername().equals(room.getOwner())) {
				usernameList.add(conectedSocket.getUsername() + "(방장)");
				continue;
			}
			usernameList.add(conectedSocket.getUsername());
		}
		ResponseDto<List<String>> responseDto = new ResponseDto<List<String>>("refreshUsernameList", usernameList);
		sendToAll(responseDto, room.getUsers());
	}
	
	private void exitRoomAll(Room room) {
		sendToAll(new ResponseDto<String>("exitRoom", null), room.getUsers());
		roomList.remove(room);
		sendToAll(refreshRoomList(), conectedSocketList); 
	}
	
	private void exitRoom(Room room) {
		room.getUsers().remove(this);
		sendToMe(new ResponseDto<String>("exitRoom", null));
		refreshUsernameList(room);
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
