#' Retrieve the location of the device
#' @author Ashai Ramsunder

get.geoLocation <- function() {
  apiGeoLocation <- getOption("googlePlaceLocation")
  return(httr::POST(apiGeoLocation))
}
