package dev.test.loginpage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers(){
        System.out.println("getAllUsers() called");
        System.out.println(userService.getAllUsers());
        return userService.getAllUsers();
    }

    @GetMapping("/help")
    public String help() {
        System.out.println("whatInfo() called");
        return userService.help();
    }

    @PostMapping("/addUser")
    public void addUser(@RequestBody User user){
        System.out.println("addUser() called");
        userService.addUser(user);
    }

    @PostMapping("/login")
    public String authenticate(@RequestBody LoginDTO loginDTO) {
        System.out.println("authenticateUser() called");
        return userService.authenticateUser(loginDTO.getUsername(), loginDTO.getPassword())
                .map(User::getId)
                .orElse("Login failed");
    }
}
