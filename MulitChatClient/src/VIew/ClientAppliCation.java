package VIew;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import java.awt.CardLayout;
import javax.swing.JTextField;
import javax.swing.JButton;
import javax.swing.JScrollPane;
import javax.swing.JList;
import javax.swing.JTextArea;


public class ClientAppliCation extends JFrame {

	private JPanel MainPanel;
	private JTextField usernameField;
	private JTextField sendMessageField;
	private CardLayout MainCard;
	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					ClientAppliCation frame = new ClientAppliCation();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the frame.
	 */
	public ClientAppliCation() {
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 480, 800);
		
		/*=======<< Panels>>======*/
		
		MainPanel = new JPanel();
		JPanel loginPanel = new JPanel();
		JPanel roomListPanel = new JPanel();
		JPanel roomPanel = new JPanel();
		
		/*=======<< LayOut >>======*/
		
		loginPanel.setLayout(null);
		roomListPanel.setLayout(null);
		roomPanel.setLayout(null);
		MainPanel.setLayout(MainCard);
		
		/*=======<< PanelSet >>======*/
		
		setContentPane(MainPanel);
		MainPanel.add(loginPanel, "loginPanel");
		MainPanel.add(roomListPanel, "roomListPanel");
		MainPanel.add(roomPanel, "roomPanel");
		
		/*=======<< Login Panel>>======*/
		
		usernameField = new JTextField();
		usernameField.setBounds(161, 278, 116, 21);
		loginPanel.add(usernameField);
		usernameField.setColumns(10);
		
		
		JButton loginButton = new JButton("시작하기");
		loginButton.setBounds(180, 319, 97, 23);
		loginPanel.add(loginButton);
		
		
		/*=======<< roomList Panel>>======*/
		
		
		JScrollPane roomListScropanel = new JScrollPane();
		roomListScropanel.setBounds(133, 10, 321, 631);
		roomListPanel.add(roomListScropanel);
		
		JList roomList = new JList();
		roomListScropanel.setViewportView(roomList);
		
		JButton roomCreateButton = new JButton("방생성");
		roomCreateButton.setBounds(12, 24, 97, 52);
		roomListPanel.add(roomCreateButton);
		
		
		/*=======<< room Panel>>======*/
		
		
		JScrollPane JoinUserScroll = new JScrollPane();
		JoinUserScroll.setBounds(0, 10, 327, 70);
		roomPanel.add(JoinUserScroll);
		
		JList userList = new JList();
		JoinUserScroll.setViewportView(userList);
		
		JButton roomExitButton = new JButton("방 나가기");
		roomExitButton.setBounds(339, 10, 97, 70);
		roomPanel.add(roomExitButton);
		
		JScrollPane chattingContentScroll = new JScrollPane();
		chattingContentScroll.setBounds(0, 90, 454, 483);
		roomPanel.add(chattingContentScroll);
		
		JTextArea chattingContent = new JTextArea();
		chattingContentScroll.setViewportView(chattingContent);
		
		sendMessageField = new JTextField();
		sendMessageField.setBounds(0, 583, 327, 58);
		roomPanel.add(sendMessageField);
		sendMessageField.setColumns(10);
		
		JButton sendButton = new JButton("전송");
		sendButton.setBounds(339, 583, 97, 47);
		roomPanel.add(sendButton);
		
		
	}
}
