package Server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.ConnectException;
import java.net.Socket;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import Server.Dto.RequestDto;
import Server.Dto.ResponseDto;
import lombok.Data;

@Data
public class SocketServer extends Thread {

	private static List<SocketServer> socketList = new ArrayList<>();
	private static Map<String, List<SocketServer>> chatRoomMap = new HashMap<>();


	private Socket socket;
	private InputStream inputStream;
	private OutputStream outputStream;
	private Gson gson;

	private String username;
	private String createRoomName;
	private String enterRoomName;

	public SocketServer(Socket socket) {
		this.socket = socket;
		socketList.add(this);
		gson = new Gson();
	}

	@Override
	public void run() {
		try {
			reciveRequest();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private void reciveRequest() throws IOException {
		inputStream = socket.getInputStream();
		BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

		while (true) {
			String request = reader.readLine();
			if (request == null) {
				throw new ConnectException();
			}
			RequestMapping(request);
		}
	}

	private void RequestMapping(String request) throws IOException {
		RequestDto<?> requestDto = gson.fromJson(request, RequestDto.class);
		System.out.println(requestDto);
		switch (requestDto.getResource()) {
		case "join":
			username = (String) requestDto.getBody();
			break;
		 case "createRoom":
			 createRoomName = (String) requestDto.getBody();
	            if (!chatRoomMap.containsKey(createRoomName)) {
	                chatRoomMap.put(createRoomName, new ArrayList<>());
	            }
	            chatRoomMap.get(createRoomName).add(this);
	            ResponseDto<?> roomResponseDto = ResponseDto.<List<String>>builder()
	            											.resource("createRoom")
	            											.username(username)
	            											.createRoomname(createRoomName)
	            											.body(new ArrayList<String>(chatRoomMap.keySet()))
	            											.build();
	            sendToAll(roomResponseDto);
	            break;
	        case "createjoin":
	            String createroomname = (String) requestDto.getBody();
	            String user = (String)requestDto.getUsername();
	            ResponseDto<?> joinResponseDto = ResponseDto.<String>builder()
	            											.resource("createjoin")
	            											.username(user)
	            											.body(createroomname)
	            											.build();
	            sendToRoom(joinResponseDto, createroomname);
	            break;

	        case "enter":
	            String enterRoom = (String) requestDto.getBody();
	            String enterUsername = (String) requestDto.getUsername();
	            if (!chatRoomMap.containsKey(enterRoom)) {
	                chatRoomMap.put(enterRoom, new ArrayList<>());
	            }
	            chatRoomMap.get(enterRoom).add(this);
	            ResponseDto<?> chatResponseDto = ResponseDto.<List<String>>builder()
	            											.resource("enter")
	            											.username(enterUsername)
	            											.enterRoomname(enterRoom)
	            											.body(null)
	            											.build();
	            sendToRoom(chatResponseDto,enterRoom);
	            break;
	        case "leave":
	        	String leaveRoomname = (String) requestDto.getBody();
	        	moveRoom(leaveRoomname);
	        	break;

	        case "sendMessage":
	            String message = (String) requestDto.getBody();
	            enterRoomName = (String) requestDto.getEnterRoomname();
	            String username1 = (String)requestDto.getUsername();
	            
	            ResponseDto<?> messageResponseDto = ResponseDto.<String>builder()
	            												.resource("sendMessage")
	            												.username(username1)
	            												.enterRoomname(enterRoomName)
	            												.body(message)
	            												.build();
	            sendToRoom(messageResponseDto,enterRoomName);
	            break;
		}
	}
	
	private void sendResponse(ResponseDto<?> responseDto) throws IOException {
		String response = gson.toJson(responseDto);
		OutputStream outputStream = socket.getOutputStream();
		PrintWriter writer = new PrintWriter(outputStream, true);
		writer.println(response);
		writer.flush();
	}
	
	
	private void sendToAll(ResponseDto<?> responseDto) throws IOException {
	    for (SocketServer socketServer : socketList) {
	    	socketServer.sendResponse(responseDto);
	    }
	}

	private void sendToRoom(ResponseDto<?> responseDto, String roomname) throws IOException {
	    List<SocketServer> socketServers = chatRoomMap.get(roomname);
	    if (socketServers != null) {
	        for (SocketServer socketServer : socketServers) {
	        	socketServer.sendResponse(responseDto);
	        }
	    }
	}
	
	private void moveRoom(String enterRoomName) throws IOException {
	    // 현재 방에서 나가기
	    List<SocketServer> currentRoom = chatRoomMap.get(enterRoomName);
	    currentRoom.remove(this);
	    ResponseDto<?> leaveResponseDto = ResponseDto.<String>builder()
	    											 .resource("leave")
	    											 .username(username)
	    											 .enterRoomname(enterRoomName)
	    											 .body(null)
	    											 .build();
	    sendToRoom(leaveResponseDto, enterRoomName);

	}
	
}
