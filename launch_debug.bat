@echo off
REM set JAVA_HOME=C:\Program Files\Java\jdk1.7.0_79
REM set PATH=C:\Program Files\Java\jdk1.7.0_79\bin;%PATH%
@title MapleSolaxia
set CLASSPATH=.;dist\*
java -Xmx2048m -Dwzpath=wz\ -Xrunjdwp:transport=dt_socket,address=9000,server=y,suspend=n net.server.Server
pause