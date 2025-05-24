package wap.starlist.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityScheme.Type;
import io.swagger.v3.oas.models.servers.Server;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    private static final String SECURITY_SCHEME_NAME = "bearerAuth";

    @Value("${swagger.server-url}")
    private String SERVER_URLS;

    @Bean
    public OpenAPI getOpenApi() {
        Server server = new Server();
        server.setUrl(SERVER_URLS);
        server.setDescription("Production Server");

        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes(SECURITY_SCHEME_NAME, createBearerScheme()))
                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
                .servers(List.of(server))
                .info(getInfo());
    }

    private Info getInfo() {
        return new Info()
                .title("Starlist")
                .description("Starlist API 문서")
                .version("0.0.1");
    }

    private SecurityScheme createBearerScheme() {
        return new SecurityScheme()
                .name("Authorization")
                .type(Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT");
    }
}
