package ma.spacebnb.meesageservice.feignclients;

import ma.spacebnb.meesageservice.dto.Host;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@FeignClient(name = "spring-security", url = "http://localhost:2424/api/hosts")
public interface HostGuestClient {


    @GetMapping("/fetch/host/{id}")
    ResponseEntity<Map<String, Host>> getHostById(@PathVariable("id") Long id);
}
