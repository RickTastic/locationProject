source("global.R")

ui <- shiny::fluidPage(
  shiny::tags$head(
    shinyjs::useShinyjs(),extendShinyjs("www/download.js", functions = "download"),
    shiny::tags$link(title = "styles", rel = "stylesheet", type = "text/css", href = "bootstrap.css"),
    shiny::tags$link(title = "styles", rel = "stylesheet", type = "text/css", href = "style.css"),
    shiny::tags$script(type = "text/javascript", src = "app-shinyjs.js"),
    shiny::tags$script(type = "text/javascript", src = "passwdInputBinding.js"),
    shiny::tags$script('
        $(document).ready(function () {

          function getLocation(callback){
          var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };

          navigator.geolocation.getCurrentPosition(onSuccess, onError);

          function onError (err) {
            Shiny.onInputChange("geolocation", false);
          }

          function onSuccess (position) {
            setTimeout(function () {
              var coords = position.coords;
              var timestamp = new Date();

              console.log(coords.latitude + ", " + coords.longitude, "," + coords.accuracy);
              Shiny.onInputChange("geolocation", true);
              Shiny.onInputChange("GPSLat", coords.latitude);
              Shiny.onInputChange("GPSLong", coords.longitude);
              Shiny.onInputChange("accuracy", coords.accuracy);
              Shiny.onInputChange("time", timestamp)

              console.log(timestamp);

              if (callback) {
                callback();
              }
            }, 1100)
          }
        }

        var TIMEOUT = 1000; //SPECIFY
        var started = false;
        function getLocationRepeat(){
          //first time only - no delay needed
          if (!started) {
            started = true;
            getLocation(getLocationRepeat);
            return;
          }

          setTimeout(function () {
            getLocation(getLocationRepeat);
          }, TIMEOUT);

        };

        getLocationRepeat();

      });
        '
     )
  ),
  shiny::br(),
  shiny::wellPanel(
    shiny::fluidRow(
      shiny::column(width = 4),
      shiny::column(width = 4, shiny::titlePanel("Google Location Project")),
      shiny::column(width = 4)
    )
  ),
  shiny::br(),
  shiny::wellPanel(
    shiny::fluidRow(
      shiny::column(width = 3, shiny::textInput("manLat", "Latitude: ")),
      shiny::column(width = 3, shiny::textInput("manLong", "Longitude: ")),
      shiny::column(width = 3, shiny::actionButton("autoLocation", "", icon = shiny::icon("map-marker")))
    ),
    shiny::fluidRow(
      shiny::column(width = 3, shiny::actionButton("manualLocation", "Use Coordinates"), offset = 0.5)
    )
  ),
  shiny::wellPanel(googleway::google_mapOutput("renderMaps")),
  shiny::wellPanel(
    shiny::fluidRow(
      shiny::column(width = 4),
      shiny::column(
        width = 4,
        shiny::actionButton(
          "generateReport",
          "Generate Report",
          width = "100%",
        )
      ),
      shiny::column(width = 4)
    )
  )
)

server <- function(input, output, session) {

  getLocation <- shiny::reactive({
    if (input$geolocation) {
      if (is.null(input$manLat) || input$manLat == "" || is.null(input$manLong) || input$manLong == "") {
        return(data.frame(lat = input$GPSLat, long = input$GPSLong, accuracy = input$accuracy, radius = input$accuracy/2))
      } else {
        return(data.frame(lat = input$manLat, long = input$manLong))
      }
    } else {
      shinyjs::alert("Please allow location permissions")
    }

  })

  .renderMaps <- function() {
    GPSLocation <- getLocation()
    googleway::google_map_update("renderMaps") %>%
      googleway::add_markers(data = GPSLocation, lat = "lat", lon = "long", update_map_view = TRUE, focus_layer = FALSE) %>%
      googleway::add_circles(data = GPSLocation, lat = "lat", lon = "long", update_map_view = TRUE, focus_layer = TRUE)

  }

  shiny::observeEvent(input$autoLocation, .renderMaps())
  shiny::observeEvent(input$manualLocation, .renderMaps())

  output$renderMaps <- googleway::renderGoogle_map({
    googleway::google_map(
      key = getOption("googleMapKey"),
      location = get.defaultLocation(),
      update_map_view = TRUE,
      geolocation = TRUE,
      zoom = 9,
      padding = "5%"
    )
  })
}

shiny::shinyApp(ui = ui, server = server)
