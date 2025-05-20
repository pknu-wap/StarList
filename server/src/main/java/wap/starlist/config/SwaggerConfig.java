package wap.starlist.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI getOpenApi() {
        return new OpenAPI()
                .components(new Components())
                .info(getInfo());
    }

    private Info getInfo() {
        return new Info()
                .title("Starlist")
                .description("Starlist API 문서")
                .version("0.0.1");
    }
}
