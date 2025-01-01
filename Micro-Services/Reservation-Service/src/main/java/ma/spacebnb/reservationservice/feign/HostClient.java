package ma.spacebnb.reservationservice.feign;

import ma.spacebnb.reservationservice.dao.dto.Host;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "spring-security", url = "http://localhost:2424/api/hosts")
public interface HostClient {


    @GetMapping("/fetch/{ref}")
    Host getHostByRef(@PathVariable("ref") String ref);
}
