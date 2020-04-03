package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.container.AsyncResponse;
import javax.ws.rs.container.Suspended;
import javax.ws.rs.container.TimeoutHandler;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import webscraber.TagCounter;
import webscraber.TagCounterCallable;

@Path("scrape")
public class WebScraperResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("tags_simple")
    public String getTags() {
        return makeResponse();
    }

    private String makeResponse() {
        return "{\"todo\":\"Make me return the calculated values from the external requests\"}";
    }

    //Green (Yellow) Students can stop here, and just use the two methods given above
    //Examples to inspire Red (Yellow) students in how to use the async API
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("slow")
    public void slow(@Suspended final AsyncResponse ar) {
        new Thread(() -> {
            String result = expensiveOperation(2000);
            ar.resume(result);
        }).start();
    }

    @GET
    @Path("veryslow")
    @Produces(MediaType.APPLICATION_JSON)

    public void asyncGetWithTimeout(@Suspended final AsyncResponse ar) {
        ar.setTimeoutHandler(new TimeoutHandler() {
            @Override
            public void handleTimeout(AsyncResponse asyncResponse) {
                asyncResponse.resume(Response.status(Response.Status.SERVICE_UNAVAILABLE)
                        .entity("{\"msg\":\"Operation timeout - Shit happens ;-)\"}").build());
            }
        });
        ar.setTimeout(5, TimeUnit.SECONDS);

        new Thread(() -> {
            String result = expensiveOperation(6000);
            ar.resume(result);
        }).start();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("tags")
    public void getTags(@Suspended final AsyncResponse ar) {
         new Thread(() -> {
            String result = makeResponse();
            ar.resume(result);
        }).start();
    }

    private String expensiveOperation(int delay) {
        try {
            Thread.sleep(delay); //Simulates a long running process
        } catch (InterruptedException e) {
            System.out.println("UPS" + e);
        }
        return "{\"msg\":\"This response was delayed a few seconds\"}";
    }

}
