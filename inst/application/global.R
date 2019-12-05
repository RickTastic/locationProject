
rm(list = ls())
options(shiny.port = 7725)
options(digest.algo = "sha512")
options(googleMapKey = "AIzaSyArls5l2cDi2qSuyj6MVZTGuAuEnFZSYs8")
locationURL <- "https://www.googleapis.com/geolocation/v1/geolocate?key="
options(googlePlaceLocation = paste0(locationURL, getOption("googleMapKey")))

get.defaultLocation <- function(countryCode = "ZA") {
  switch(
    countryCode,
    "ZA" = c(-26.107567, 28.056702)
  )
}

library(stringi)
library(plotly)
library(shiny)
library(shinydashboard)
library(shinyBS)
library(shinycssloaders)
library(shinyjs)
library(shinyLP)
library(tidyverse)
library(DT)
library(bsplus)
library(jsonlite)
library(httr)
library(yaml)
library(shinythemes)
library(formattable)
library(DBI)
library(googlePolylines)
library(googleway)

onStop(function() return())
