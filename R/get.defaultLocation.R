#' Returns the default location to add onto google maps
#' @author Ashai Ramsunder

get.defaultLocation <- function(countryCode = "ZA") {
  switch(
    countryCode,
    "ZA" = c(-26.107567, 28.056702)
  )
}
