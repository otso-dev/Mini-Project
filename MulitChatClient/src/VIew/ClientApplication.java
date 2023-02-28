package VIew;

import java.awt.CardLayout;
import java.awt.EventQueue;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.ConnectException;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.List;
import java.util.Map;

import javax.swing.DefaultListModel;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JList;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;

import com.google.gson.Gson;

import dto.request.RequestDto;
import lombok.Getter;
import lombok.Setter;


@Getter
public class ClientApplication extends JFrame {

	private static final long serialVersionUID = -8217532290504057348L;
	private static ClientApplication instance;
	
	
	
	private Gson gson;
	private Socket socket;

	private JPanel MainPanel;
	private CardLayout MainCard;

	private JTextField usernameField;

	private JTextField sendMessageField;
	
	@Setter
	private List<Map<String, String>> roomInfoList;
	private DefaultListModel<String> roomNameListModel;
	private DefaultListModel<String> usernameListModel;

	public static ClientApplication getInstance() {
		
		if(instance == null) {
			instance = new ClientApplication();
		}
		return instance;
	}
	
	
	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					ClientApplication frame = ClientApplication.getInstance();
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
	private ClientApplication() {

		/* =======<< Init >>====== */
		gson = new Gson();

		try {
			socket = new Socket("127.0.0.1", 9090);
			ClientRecive clientRecive = new ClientRecive(socket);
			clientRecive.start();
			
		} catch (UnknownHostException e1) {
			e1.printStackTrace();
		} catch (ConnectException e1) {
			JOptionPane.showMessageDialog(this, "서버에 접속할 수 없습니다.", "접속오류", JOptionPane.ERROR_MESSAGE);
			System.exit(0);
		} catch (IOException e1) {
			e1.printStackTrace();
		} 

		/* =======<< frame set>>====== */

		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 480, 800);

		/* =======<< Panels >>====== */

		MainPanel = new JPanel();
		JPanel loginPanel = new JPanel();
		JPanel roomListPanel = new JPanel();
		JPanel roomPanel = new JPanel();

		/* =======<< LayOut >>====== */
		MainCard = new CardLayout();
		
		MainPanel.setLayout(MainCard);
		loginPanel.setLayout(null);
		roomListPanel.setLayout(null);
		roomPanel.setLayout(null);
		

		/* =======<< PanelSet >>====== */

		setContentPane(MainPanel);
		MainPanel.add(loginPanel, "loginPanel");
		MainPanel.add(roomListPanel, "roomListPanel");
		MainPanel.add(roomPanel, "roomPanel");

		/* =======<< Login Panel >>====== */

		JButton loginButton = new JButton("접속하기");
		usernameField = new JTextField();
		usernameField.requestFocus();
		usernameField.addKeyListener(new KeyAdapter() {
		    @Override
		    public void keyPressed(KeyEvent e) {
		        if (e.getKeyCode() == KeyEvent.VK_ENTER) {
		            System.out.println("Enter 키 누름");
		            Toolkit.getDefaultToolkit().beep();
		            loginButton.doClick(); // 버튼 클릭
		        }
		    }
		});
		// usernameField에 포커스를 설정해줍니다.
		

		usernameField.setBounds(161, 278, 116, 21);
		loginPanel.add(usernameField);
		usernameField.setColumns(10);
		
		loginButton.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("로그인 버튼 클릭됨");
		        RequestDto<String> usernameCheckReqDto = new RequestDto<String>("usernameCheck", usernameField.getText());
		        sendRequest(usernameCheckReqDto);
			}
		});
		
//		loginButton.addMouseListener(new MouseAdapter() {
//		    @Override
//		    public void mouseClicked(MouseEvent e) {
//		        System.out.println("로그인 버튼 클릭됨");
//		        RequestDto<String> usernameCheckReqDto = new RequestDto<String>("usernameCheck", usernameField.getText());
//		        sendRequest(usernameCheckReqDto);
//		    }
//		});
		loginButton.setBounds(172, 319, 97, 23);
		loginPanel.add(loginButton);

		/* =======<< roomList Panel >>====== */

		JScrollPane roomListScropanel = new JScrollPane();
		roomListScropanel.setBounds(133, 10, 321, 631);
		roomListPanel.add(roomListScropanel);
		
		roomNameListModel = new DefaultListModel<>();
		JList roomList = new JList(roomNameListModel);
		roomList.addMouseListener(new MouseAdapter() {
		
			@Override
			public void mouseClicked(MouseEvent e) {
				if(e.getClickCount() == 2) {
					int selectedIndex = roomList.getSelectedIndex();
					
					RequestDto<Map<String,String>> requestDto = new RequestDto<Map<String,String>>("enterRoom", roomInfoList.get(selectedIndex));
					sendRequest(requestDto);
				}
			}
		});
		roomListScropanel.setViewportView(roomList);

		JButton roomCreateButton = new JButton("방생성");
		roomCreateButton.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				String roomName = null;
				while(true) {
					roomName = JOptionPane.showInputDialog(null,"생성할 방의 제목을 입력하세요","방 생성",JOptionPane.PLAIN_MESSAGE);
					if(!roomName.isBlank()) {
						break;
					}
					JOptionPane.showMessageDialog(null, "공백은 사용 할 수 없습니다.","방생성 오류",JOptionPane.ERROR_MESSAGE);
				}
				RequestDto<String> requestDto = new RequestDto<String>("createRoom", roomName);
				sendRequest(requestDto);
			}
		});
		
		roomCreateButton.setBounds(12, 24, 97, 52);
		roomListPanel.add(roomCreateButton);

		/* =======<< room Panel >>====== */
		
	
		JScrollPane JoinUserScroll = new JScrollPane();
		JoinUserScroll.setBounds(0, 10, 327, 70);
		roomPanel.add(JoinUserScroll);
		
		
		usernameListModel = new DefaultListModel<String>();
		JList userList = new JList(usernameListModel);
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

	private void sendRequest(RequestDto<?> requestDto) {
		String reqJson = gson.toJson(requestDto);
		OutputStream outputStream = null;
		PrintWriter printWriter = null;
		try {
			outputStream = socket.getOutputStream();
			printWriter = new PrintWriter(outputStream, true);
			printWriter.println(reqJson);
			System.out.println("클라이언트 -> 서버: " + reqJson);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
}
