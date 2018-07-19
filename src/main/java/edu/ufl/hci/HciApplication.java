package edu.ufl.hci;

import main.java.edu.ufl.hci.FormData;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "*")
public class HciApplication {

	public static void main(String[] args) {
		SpringApplication.run(HciApplication.class, args);
	}

	@RequestMapping(value = "/translate", method = RequestMethod.POST)
	public String home(@RequestBody FormData data) throws IOException {
		String url = "https://api.microsofttranslator.com/V2/Http.svc/Translate?from="+data.fromLang
				+"&to="+data.toLang+"&text="
				+ data.content;

		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();

		// optional default is GET
		con.setRequestMethod("GET");

		//add request header
		con.setRequestProperty("Ocp-Apim-Subscription-Key", "d868449c13c24c898280685b04ee9fc7");
		con.setRequestProperty("accept-charset", "UTF-8");
		con.setRequestProperty("content-type", "application/x-www-form-urlencoded; charset=utf-8");



		BufferedReader in = new BufferedReader(
				new InputStreamReader(con.getInputStream(),"UTF-8"));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();

		//print result
		System.out.println(response.toString());
		String rsp = response.toString().replace("<string xmlns=\"http://schemas.microsoft.com/2003/10/Serialization/\">","")
				.replace("</string>","");
		System.out.println(rsp);
		return "{\"data\":\""+rsp+"\"}";
	}
}
