package ma.xproce.springsecurity;

import ma.xproce.springsecurity.dao.entity.Guest;
import ma.xproce.springsecurity.dao.repositories.GuestRepository;
import ma.xproce.springsecurity.dao.repositories.HostRepository;
import ma.xproce.springsecurity.services.HostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootApplication
@EnableFeignClients
public class SpringSecurityApplication implements CommandLineRunner {


    @Autowired
    private HostService propertyService;

    @Autowired
    private HostRepository propertyRepository;  // Inject PropertyRepository

    public static void main(String[] args) {
        SpringApplication.run(SpringSecurityApplication.class, args);
    }


	@Override
	public void run(String... args) throws Exception {
		// Delete all properties from the database
		//propertyRepository.deleteAll();  // This deletes all records from the Property table

		// Fetch new properties and save them to the database
		//propertyService.fetchAndSaveHostData();
	}

}



