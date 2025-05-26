// instrumentation.js 파일 내용을 아래 코드로 교체

const { NodeSDK } = require("@opentelemetry/sdk-node");
const {
	OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-grpc");
const {
	getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");

const sdk = new NodeSDK({
	traceExporter: new OTLPTraceExporter({
		url: "grpc://localhost:4317", // 로컬 Docker Collector 주소
	}),
	instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
