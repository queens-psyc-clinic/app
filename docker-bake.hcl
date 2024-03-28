target "app" {
  cache-to = [
    "type=gha,ignore-error=true,mode=max,scope=app"
  ]
  cache-from = [
    "type=gha,scope=app"
  ]
}
target "db" {
  cache-to = [
    "type=gha,ignore-error=true,mode=max,scope=db"
  ]
  cache-from = [
    "type=gha,scope=db"
  ]
}
