package dev.test.loginpage;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface IUserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsernameAndPassword(String username, String password);
}
