scripts/npc/world0/9000037.js
javax.script.ScriptException: sun.org.mozilla.javascript.internal.EvaluatorException: missing ) after condition (<Unknown source>#14) in <Unknown source> at line number 14
	at com.sun.script.javascript.RhinoScriptEngine.eval(Unknown Source)
	at javax.script.AbstractScriptEngine.eval(Unknown Source)
	at scripting.AbstractScriptManager.getInvocable(AbstractScriptManager.java:70)
	at scripting.npc.NPCScriptManager.start(NPCScriptManager.java:70)
	at scripting.npc.NPCScriptManager.start(NPCScriptManager.java:54)
	at net.server.channel.handlers.NPCTalkHandler.handlePacket(NPCTalkHandler.java:64)
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
Caused by: sun.org.mozilla.javascript.internal.EvaluatorException: missing ) after condition (<Unknown source>#14)
	at sun.org.mozilla.javascript.internal.DefaultErrorReporter.runtimeError(Unknown Source)
	at sun.org.mozilla.javascript.internal.DefaultErrorReporter.error(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.addError(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.addError(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.reportError(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.reportError(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.mustMatchToken(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.mustMatchToken(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.condition(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.ifStatement(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.statementHelper(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.statement(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.statements(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.block(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.statementHelper(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.statement(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.ifStatement(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.statementHelper(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.statement(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.forLoop(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.statementHelper(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.statement(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.statements(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.block(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.statementHelper(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.statement(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.ifStatement(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.statementHelper(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.statement(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.ifStatement(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.statementHelper(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.statement(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.parseFunctionBody(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.function(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.parse(Unknown Source)
	at sun.org.mozilla.javascript.internal.Parser.parse(Unknown Source)
	at sun.org.mozilla.javascript.internal.Context.compileImpl(Unknown Source)
	at sun.org.mozilla.javascript.internal.Context.compileReader(Unknown Source)
	at sun.org.mozilla.javascript.internal.Context.compileReader(Unknown Source)
	at sun.org.mozilla.javascript.internal.Context.evaluateReader(Unknown Source)
	... 28 more

---------------------------------
