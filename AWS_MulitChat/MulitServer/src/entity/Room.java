package entity;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import main.ConectedSocket;


@Getter
public class Room {
	private String roomName;
	private String owner;
	private List<ConectedSocket> users;
	
	public Room(String roomName, String owner) {
		this.roomName = roomName;
		this.owner = owner;
		users = new ArrayList<>();
	}
	
	public List<String> getUsernameList(){
		List<String> usernameList = new ArrayList<>();
		for(ConectedSocket conectedSocket : users) {
			usernameList.add(conectedSocket.getUsername());
		}
		
		return usernameList;
	}
}
