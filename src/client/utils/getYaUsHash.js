const YA_US_HASH = 'eyJpbnRlcnZhbCI6NSwicGVyaW9kaWNpdHkiOjEsInRpbWVVbml0IjoibWludXRlIiwiY2FuZGxlV2lkdGgiOjMuMTk4MDUxOTQ4MDUxOTQ4LCJ2b2x1bWVVbmRlcmxheSI6dHJ1ZSwiYWRqIjp0cnVlLCJjcm9zc2hhaXIiOnRydWUsImNoYXJ0VHlwZSI6ImNhbmRsZSIsImV4dGVuZGVkIjpmYWxzZSwibWFya2V0U2Vzc2lvbnMiOnt9LCJhZ2dyZWdhdGlvblR5cGUiOiJvaGxjIiwiY2hhcnRTY2FsZSI6ImxpbmVhciIsInBhbmVscyI6eyJjaGFydCI6eyJwZXJjZW50IjowLjY0LCJkaXNwbGF5IjoiQUFQTCIsImNoYXJ0TmFtZSI6ImNoYXJ0IiwiaW5kZXgiOjAsInlBeGlzIjp7Im5hbWUiOiJjaGFydCIsInBvc2l0aW9uIjpudWxsfSwieWF4aXNMSFMiOltdLCJ5YXhpc1JIUyI6WyJjaGFydCIsIuKAjHZvbCB1bmRy4oCMIl19LCLigIxyc2nigIwgKDE0KSI6eyJwZXJjZW50IjowLjE2LCJkaXNwbGF5Ijoi4oCMcnNp4oCMICgxNCkiLCJjaGFydE5hbWUiOiJjaGFydCIsImluZGV4IjoxLCJ5QXhpcyI6eyJuYW1lIjoiSzdQV0ZNTkxBTSIsInBvc2l0aW9uIjpudWxsfSwieWF4aXNMSFMiOltdLCJ5YXhpc1JIUyI6WyJLN1BXRk1OTEFNIl19LCLigIxtYWNk4oCMICgxMiwyNiw5KSI6eyJwZXJjZW50IjowLjE5OTk5OTk5OTk5OTk5OTk2LCJkaXNwbGF5Ijoi4oCMbWFjZOKAjCAoMTIsMjYsOSkiLCJjaGFydE5hbWUiOiJjaGFydCIsImluZGV4IjoyLCJ5QXhpcyI6eyJuYW1lIjoiSzdQV0ZNTk1ZNiIsInBvc2l0aW9uIjpudWxsfSwieWF4aXNMSFMiOltdLCJ5YXhpc1JIUyI6WyJLN1BXRk1OTVk2Il19fSwic2V0U3BhbiI6eyJtdWx0aXBsaWVyIjo1LCJiYXNlIjoiZGF5IiwicGVyaW9kaWNpdHkiOnsiaW50ZXJ2YWwiOjUsInBlcmlvZCI6MSwidGltZVVuaXQiOiJtaW51dGUifSwibWFpbnRhaW5QZXJpb2RpY2l0eSI6dHJ1ZSwiZm9yY2VMb2FkIjp0cnVlfSwibGluZVdpZHRoIjoyLCJzdHJpcGVkQmFja2dyb3VuZCI6dHJ1ZSwiZXZlbnRzIjp0cnVlLCJjb2xvciI6IiMwMDgxZjIiLCJzdHJpcGVkQmFja2dyb3VkIjp0cnVlLCJzeW1ib2xzIjpbeyJzeW1ib2wiOiJBQVBMIiwic3ltYm9sT2JqZWN0Ijp7InN5bWJvbCI6IkFBUEwiLCJxdW90ZVR5cGUiOiJFUVVJVFkiLCJleGNoYW5nZVRpbWVab25lIjoiQW1lcmljYS9OZXdfWW9yayJ9LCJwZXJpb2RpY2l0eSI6MSwiaW50ZXJ2YWwiOjUsInRpbWVVbml0IjoibWludXRlIiwic2V0U3BhbiI6eyJtdWx0aXBsaWVyIjo1LCJiYXNlIjoiZGF5IiwicGVyaW9kaWNpdHkiOnsiaW50ZXJ2YWwiOjUsInBlcmlvZCI6MSwidGltZVVuaXQiOiJtaW51dGUifSwibWFpbnRhaW5QZXJpb2RpY2l0eSI6dHJ1ZSwiZm9yY2VMb2FkIjp0cnVlfX1dLCJldmVudE1hcCI6eyJjb3Jwb3JhdGUiOnsiZGl2cyI6dHJ1ZSwic3BsaXRzIjp0cnVlfSwic2lnRGV2Ijp7fX0sImN1c3RvbVJhbmdlIjpudWxsLCJzdHVkaWVzIjp7IuKAjG1h4oCMICgyMCxDLG1hLDApIjp7InR5cGUiOiJtYSIsImlucHV0cyI6eyJQZXJpb2QiOiIyMCIsIkZpZWxkIjoiQ2xvc2UiLCJUeXBlIjoic2ltcGxlIiwiT2Zmc2V0IjowLCJpZCI6IuKAjG1h4oCMICgyMCxDLG1hLDApIiwiZGlzcGxheSI6IuKAjG1h4oCMICgyMCxDLG1hLDApIn0sIm91dHB1dHMiOnsiTUEiOiIjYWQ2ZWZmIn0sInBhbmVsIjoiY2hhcnQiLCJwYXJhbWV0ZXJzIjp7ImNoYXJ0TmFtZSI6ImNoYXJ0IiwicGFuZWxOYW1lIjoiY2hhcnQifX0sIuKAjE1BIEVuduKAjCAoQyw1MCxwZXJjZW50LDUsbWEseSkiOnsidHlwZSI6Ik1BIEVudiIsImlucHV0cyI6eyJQZXJpb2QiOjUwLCJGaWVsZCI6IkNsb3NlIiwiU2hpZnQgVHlwZSI6InBlcmNlbnQiLCJTaGlmdCI6NSwiTW92aW5nIEF2ZXJhZ2UgVHlwZSI6InNpbXBsZSIsIkNoYW5uZWwgRmlsbCI6dHJ1ZSwiaWQiOiLigIxNQSBFbnbigIwgKEMsNTAscGVyY2VudCw1LG1hLHkpIiwiZGlzcGxheSI6IuKAjE1BIEVuduKAjCAoQyw1MCxwZXJjZW50LDUsbWEseSkifSwib3V0cHV0cyI6eyJNQSBFbnYgVG9wIjoiI2ZmZGI0OCIsIk1BIEVudiBNZWRpYW4iOiIjZmZhMzNmIiwiTUEgRW52IEJvdHRvbSI6IiNmZmJkNzQifSwicGFuZWwiOiJjaGFydCIsInBhcmFtZXRlcnMiOnsiY2hhcnROYW1lIjoiY2hhcnQiLCJwYW5lbE5hbWUiOiJjaGFydCJ9fSwi4oCMcnNp4oCMICgxNCkiOnsidHlwZSI6InJzaSIsImlucHV0cyI6eyJQZXJpb2QiOjE0LCJGaWVsZCI6ImZpZWxkIiwiaWQiOiLigIxyc2nigIwgKDE0KSIsImRpc3BsYXkiOiLigIxyc2nigIwgKDE0KSJ9LCJvdXRwdXRzIjp7IlJTSSI6IiNhZDZlZmYifSwicGFuZWwiOiLigIxyc2nigIwgKDE0KSIsInBhcmFtZXRlcnMiOnsic3R1ZHlPdmVyWm9uZXNFbmFibGVkIjp0cnVlLCJzdHVkeU92ZXJCb3VnaHRWYWx1ZSI6ODAsInN0dWR5T3ZlckJvdWdodENvbG9yIjoiIzc5ZjRiZCIsInN0dWR5T3ZlclNvbGRWYWx1ZSI6MjAsInN0dWR5T3ZlclNvbGRDb2xvciI6IiNmZjgwODQiLCJjaGFydE5hbWUiOiJjaGFydCIsInBhbmVsTmFtZSI6IuKAjHJzaeKAjCAoMTQpIn19LCLigIxtYWNk4oCMICgxMiwyNiw5KSI6eyJ0eXBlIjoibWFjZCIsImlucHV0cyI6eyJGYXN0IE1BIFBlcmlvZCI6MTIsIlNsb3cgTUEgUGVyaW9kIjoyNiwiU2lnbmFsIFBlcmlvZCI6OSwiaWQiOiLigIxtYWNk4oCMICgxMiwyNiw5KSIsImRpc3BsYXkiOiLigIxtYWNk4oCMICgxMiwyNiw5KSJ9LCJvdXRwdXRzIjp7Ik1BQ0QiOiIjYWQ2ZWZmIiwiU2lnbmFsIjoiI2ZmYTMzZiIsIkluY3JlYXNpbmcgQmFyIjoiIzc5ZjRiZCIsIkRlY3JlYXNpbmcgQmFyIjoiI2ZmODA4NCJ9LCJwYW5lbCI6IuKAjG1hY2TigIwgKDEyLDI2LDkpIiwicGFyYW1ldGVycyI6eyJjaGFydE5hbWUiOiJjaGFydCIsInBhbmVsTmFtZSI6IuKAjG1hY2TigIwgKDEyLDI2LDkpIn19LCLigIxtYeKAjCAoMjAwLEMsbWEsMCkiOnsidHlwZSI6Im1hIiwiaW5wdXRzIjp7IlBlcmlvZCI6IjIwMCIsIkZpZWxkIjoiQ2xvc2UiLCJUeXBlIjoic2ltcGxlIiwiT2Zmc2V0IjowLCJpZCI6IuKAjG1h4oCMICgyMDAsQyxtYSwwKSIsImRpc3BsYXkiOiLigIxtYeKAjCAoMjAwLEMsbWEsMCkifSwib3V0cHV0cyI6eyJNQSI6IiMwMDg5NGMifSwicGFuZWwiOiJjaGFydCIsInBhcmFtZXRlcnMiOnsiY2hhcnROYW1lIjoiY2hhcnQiLCJwYW5lbE5hbWUiOiJjaGFydCJ9fSwi4oCMdm9sIHVuZHLigIwiOnsidHlwZSI6InZvbCB1bmRyIiwiaW5wdXRzIjp7ImlkIjoi4oCMdm9sIHVuZHLigIwiLCJkaXNwbGF5Ijoi4oCMdm9sIHVuZHLigIwifSwib3V0cHV0cyI6eyJVcCBWb2x1bWUiOiIjMDBiMDYxIiwiRG93biBWb2x1bWUiOiIjZmYzMzNhIn0sInBhbmVsIjoiY2hhcnQiLCJwYXJhbWV0ZXJzIjp7IndpZHRoRmFjdG9yIjowLjQ1LCJjaGFydE5hbWUiOiJjaGFydCIsInBhbmVsTmFtZSI6ImNoYXJ0In19fX0%3D';
export default function getYaUsHash() {
  return YA_US_HASH;
}
