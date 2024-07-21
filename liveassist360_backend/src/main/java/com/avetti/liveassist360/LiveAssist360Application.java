package com.avetti.liveassist360;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "LiveAssist 360 API", version = "1.0", description= "LiveAssist 360"))
public class LiveAssist360Application {

    public static void main(String[] args) {
        SpringApplication.run(LiveAssist360Application.class, args);
    }
}
