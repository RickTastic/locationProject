#' Parsing handler for geolocation
#' @author Ashai Ramsunder
#'

parse.geoLocation <- function(json) return(as.data.frame(httr::content(json)))
