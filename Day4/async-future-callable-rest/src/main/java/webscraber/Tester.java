package webscraber;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class Tester {
  
   private static List<TagCounter> runSequental() {

    List<TagCounter> urls = new ArrayList();
    
    urls.add(new TagCounter("https://www.fck.dk"));
    urls.add(new TagCounter("https://www.google.com"));
    urls.add(new TagCounter("https://politiken.dk"));
    urls.add(new TagCounter("https://cphbusiness.dk"));
    
    for (TagCounter tagCounter : urls) {
      
      tagCounter.doWork();
      System.out.println("Title: " + tagCounter.getTitle());
      System.out.println("Div's: " + tagCounter.getDivCount());
      System.out.println("Body's: "+ tagCounter.getBodyCount());
      System.out.println("----------------------------------");
    }
        return urls;
}
  
    private List<TagCounter> runParrallel() throws InterruptedException {
         
        List<TagCounter> urls = new ArrayList();
        urls.add(new TagCounter("https://www.fck.dk"));
        urls.add(new TagCounter("https://www.google.com"));
        urls.add(new TagCounter("https://politiken.dk"));
        urls.add(new TagCounter("https://cphbusiness.dk"));
        ExecutorService workingJack = Executors.newFixedThreadPool(4);
        for (TagCounter tc : urls) {
            Runnable task = () -> {
                try {
                    tc.doWork();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            };
            workingJack.submit(task);
        }
        workingJack.shutdown();
        workingJack.awaitTermination(15, TimeUnit.SECONDS);
        return urls;
 }
  
  
  
  public static void main(String[] args) throws InterruptedException {
    long timeSequental;
    long timeParallel;
    long start = System.nanoTime();
    
  List<TagCounter> fetchedDataSequental = new Tester().runSequental();
        long end = System.nanoTime();
        timeSequental = end - start;
        System.out.println("Time Sequential: " + ((timeSequental) / 1_000_000) + " ms.");

        for (TagCounter tagCounter : fetchedDataSequental) {
            System.out.println("Title: " + tagCounter.getTitle());
            System.out.println("Div's: " + tagCounter.getDivCount());
            System.out.println("Body's: "+ tagCounter.getBodyCount());
            System.out.println("----------------------------------");
        }

        
   
    start = System.nanoTime();
    List<TagCounter> fetchedDataParallel = new Tester().runParrallel();
    end = System.nanoTime();
    timeParallel = end - start;
    System.out.println("Time Parallel: " + ((timeParallel)/1_000_000)+" ms.");
    for (TagCounter tagCounter : fetchedDataParallel) {
            System.out.println("Title: " + tagCounter.getTitle());
            System.out.println("Div's: " + tagCounter.getDivCount());
            System.out.println("Body's: "+ tagCounter.getBodyCount());
            System.out.println("----------------------------------");
        }
    
    System.out.println("Parallel was "+timeSequental/timeParallel + " times faster");
         
    }

  
}