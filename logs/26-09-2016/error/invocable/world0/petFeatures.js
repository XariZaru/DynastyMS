scripts/npc/world0/petFeatures.js
javax.script.ScriptException: <eval>:112:1 Expected } but found eof
}
 ^ in <eval> at line number 112 at column number 1
	at jdk.nashorn.api.scripting.NashornScriptEngine.throwAsScriptException(NashornScriptEngine.java:467)
	at jdk.nashorn.api.scripting.NashornScriptEngine.compileImpl(NashornScriptEngine.java:534)
	at jdk.nashorn.api.scripting.NashornScriptEngine.compileImpl(NashornScriptEngine.java:521)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:399)
	at jdk.nashorn.api.scripting.NashornScriptEngine.eval(NashornScriptEngine.java:150)
	at javax.script.AbstractScriptEngine.eval(Unknown Source)
	at scripting.AbstractScriptManager.getInvocable(AbstractScriptManager.java:70)
	at scripting.npc.NPCScriptManager.start(NPCScriptManager.java:124)
	at scripting.AbstractPlayerInteraction.openNpc(AbstractPlayerInteraction.java:269)
	at jdk.nashorn.internal.scripts.Script$Recompilation$1575$1033AAAA$\^eval\_.action(<eval>:28)
	at jdk.nashorn.internal.runtime.ScriptFunctionData.invoke(ScriptFunctionData.java:645)
	at jdk.nashorn.internal.runtime.ScriptFunction.invoke(ScriptFunction.java:494)
	at jdk.nashorn.internal.runtime.ScriptRuntime.apply(ScriptRuntime.java:393)
	at jdk.nashorn.api.scripting.ScriptObjectMirror.callMember(ScriptObjectMirror.java:199)
	at jdk.nashorn.api.scripting.NashornScriptEngine.invokeImpl(NashornScriptEngine.java:383)
	at jdk.nashorn.api.scripting.NashornScriptEngine.invokeFunction(NashornScriptEngine.java:190)
	at scripting.npc.NPCScriptManager.action(NPCScriptManager.java:172)
	at net.server.channel.handlers.NPCMoreTalkHandler.handlePacket(NPCMoreTalkHandler.java:87)
	at net.MapleServerHandler.messageReceived(MapleServerHandler.java:135)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$TailFilter.messageReceived(DefaultIoFilterChain.java:690)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.filter.codec.ProtocolCodecFilter$ProtocolDecoderOutputImpl.flush(ProtocolCodecFilter.java:407)
	at org.apache.mina.filter.codec.ProtocolCodecFilter.messageReceived(ProtocolCodecFilter.java:236)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.core.filterchain.IoFilterAdapter.messageReceived(IoFilterAdapter.java:109)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.fireMessageReceived(DefaultIoFilterChain.java:410)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.read(AbstractPollingIoProcessor.java:710)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:664)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:653)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.access$600(AbstractPollingIoProcessor.java:67)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor$Processor.run(AbstractPollingIoProcessor.java:1124)
	at org.apache.mina.util.NamePreservingRunnable.run(NamePreservingRunnable.java:64)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
	at java.lang.Thread.run(Unknown Source)
Caused by: jdk.nashorn.internal.runtime.ParserException: <eval>:112:1 Expected } but found eof
}
 ^
	at jdk.nashorn.internal.parser.AbstractParser.error(AbstractParser.java:292)
	at jdk.nashorn.internal.parser.AbstractParser.error(AbstractParser.java:277)
	at jdk.nashorn.internal.parser.AbstractParser.expectDontAdvance(AbstractParser.java:348)
	at jdk.nashorn.internal.parser.AbstractParser.expect(AbstractParser.java:335)
	at jdk.nashorn.internal.parser.Parser.functionBody(Parser.java:2926)
	at jdk.nashorn.internal.parser.Parser.functionExpression(Parser.java:2663)
	at jdk.nashorn.internal.parser.Parser.statement(Parser.java:875)
	at jdk.nashorn.internal.parser.Parser.sourceElements(Parser.java:773)
	at jdk.nashorn.internal.parser.Parser.program(Parser.java:709)
	at jdk.nashorn.internal.parser.Parser.parse(Parser.java:283)
	at jdk.nashorn.internal.parser.Parser.parse(Parser.java:249)
	at jdk.nashorn.internal.runtime.Context.compile(Context.java:1286)
	at jdk.nashorn.internal.runtime.Context.compileScript(Context.java:1253)
	at jdk.nashorn.internal.runtime.Context.compileScript(Context.java:625)
	at jdk.nashorn.api.scripting.NashornScriptEngine.compileImpl(NashornScriptEngine.java:532)
	... 38 more

---------------------------------
scripts/npc/world0/petFeatures.js
javax.script.ScriptException: <eval>:112:1 Expected } but found eof
}
 ^ in <eval> at line number 112 at column number 1
	at jdk.nashorn.api.scripting.NashornScriptEngine.throwAsScriptException(NashornScriptEngine.java:467)
	at jdk.nashorn.api.scripting.NashornScriptEngine.compileImpl(NashornScriptEngine.java:534)
	at jdk.nashorn.api.scripting.NashornScriptEngine.compileImpl(NashornScriptEngine.java:521)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:399)
	at jdk.nashorn.api.scripting.NashornScriptEngine.eval(NashornScriptEngine.java:150)
	at javax.script.AbstractScriptEngine.eval(Unknown Source)
	at scripting.AbstractScriptManager.getInvocable(AbstractScriptManager.java:70)
	at scripting.npc.NPCScriptManager.start(NPCScriptManager.java:124)
	at scripting.AbstractPlayerInteraction.openNpc(AbstractPlayerInteraction.java:269)
	at jdk.nashorn.internal.scripts.Script$Recompilation$1589$1033AAAA$\^eval\_.action(<eval>:28)
	at jdk.nashorn.internal.runtime.ScriptFunctionData.invoke(ScriptFunctionData.java:645)
	at jdk.nashorn.internal.runtime.ScriptFunction.invoke(ScriptFunction.java:494)
	at jdk.nashorn.internal.runtime.ScriptRuntime.apply(ScriptRuntime.java:393)
	at jdk.nashorn.api.scripting.ScriptObjectMirror.callMember(ScriptObjectMirror.java:199)
	at jdk.nashorn.api.scripting.NashornScriptEngine.invokeImpl(NashornScriptEngine.java:383)
	at jdk.nashorn.api.scripting.NashornScriptEngine.invokeFunction(NashornScriptEngine.java:190)
	at scripting.npc.NPCScriptManager.action(NPCScriptManager.java:172)
	at net.server.channel.handlers.NPCMoreTalkHandler.handlePacket(NPCMoreTalkHandler.java:87)
	at net.MapleServerHandler.messageReceived(MapleServerHandler.java:135)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$TailFilter.messageReceived(DefaultIoFilterChain.java:690)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.filter.codec.ProtocolCodecFilter$ProtocolDecoderOutputImpl.flush(ProtocolCodecFilter.java:407)
	at org.apache.mina.filter.codec.ProtocolCodecFilter.messageReceived(ProtocolCodecFilter.java:236)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.core.filterchain.IoFilterAdapter.messageReceived(IoFilterAdapter.java:109)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.fireMessageReceived(DefaultIoFilterChain.java:410)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.read(AbstractPollingIoProcessor.java:710)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:664)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:653)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.access$600(AbstractPollingIoProcessor.java:67)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor$Processor.run(AbstractPollingIoProcessor.java:1124)
	at org.apache.mina.util.NamePreservingRunnable.run(NamePreservingRunnable.java:64)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
	at java.lang.Thread.run(Unknown Source)
Caused by: jdk.nashorn.internal.runtime.ParserException: <eval>:112:1 Expected } but found eof
}
 ^
	at jdk.nashorn.internal.parser.AbstractParser.error(AbstractParser.java:292)
	at jdk.nashorn.internal.parser.AbstractParser.error(AbstractParser.java:277)
	at jdk.nashorn.internal.parser.AbstractParser.expectDontAdvance(AbstractParser.java:348)
	at jdk.nashorn.internal.parser.AbstractParser.expect(AbstractParser.java:335)
	at jdk.nashorn.internal.parser.Parser.functionBody(Parser.java:2926)
	at jdk.nashorn.internal.parser.Parser.functionExpression(Parser.java:2663)
	at jdk.nashorn.internal.parser.Parser.statement(Parser.java:875)
	at jdk.nashorn.internal.parser.Parser.sourceElements(Parser.java:773)
	at jdk.nashorn.internal.parser.Parser.program(Parser.java:709)
	at jdk.nashorn.internal.parser.Parser.parse(Parser.java:283)
	at jdk.nashorn.internal.parser.Parser.parse(Parser.java:249)
	at jdk.nashorn.internal.runtime.Context.compile(Context.java:1286)
	at jdk.nashorn.internal.runtime.Context.compileScript(Context.java:1253)
	at jdk.nashorn.internal.runtime.Context.compileScript(Context.java:625)
	at jdk.nashorn.api.scripting.NashornScriptEngine.compileImpl(NashornScriptEngine.java:532)
	... 38 more

---------------------------------