package ma.spacebnb.propertiesservice;

import ma.spacebnb.propertiesservice.dao.repositories.PropertyRepository;
import ma.spacebnb.propertiesservice.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PropertiesServiceApplication{

	@Autowired
	private PropertyService propertyService;

	@Autowired
	private PropertyRepository propertyRepository;  // Inject PropertyRepository

	public static void main(String[] args) {
		SpringApplication.run(PropertiesServiceApplication.class, args);
	}
	/*
	@Override
	public void run(String... args) throws Exception {
		// Delete all properties from the database
		//propertyRepository.deleteAll();  // This deletes all records from the Property table

		// Fetch new properties and save them to the database
		propertyService.fetchAndSaveApifyProperties();
	} */
}