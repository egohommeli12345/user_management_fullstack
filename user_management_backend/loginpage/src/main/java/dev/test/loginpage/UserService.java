package dev.test.loginpage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private IUserRepository userRepository;

    public List<User> getAllUsers(){
        System.out.println("getAllUsers() SERVICE called");
        System.out.println(userRepository.findAll());
        return userRepository.findAll();
    }

    public String help() {
        System.out.println("whatInfo() SERVICE called");
        return "username, email, password";
    }

    public void addUser(User user){
        System.out.println("addUser() SERVICE called");
        userRepository.save(user);
    }

    public Optional<User> authenticateUser(String username, String password) {
        System.out.println("authenticateUser() SERVICE called");
        return userRepository.findByUsernameAndPassword(username, password);
    }
}
