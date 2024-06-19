FROM --platform=linux/amd64 openjdk:22

ADD backend/target/backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]