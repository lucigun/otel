import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { registerInstrumentations } from "@opentelemetry/instrumentation";

const provider = new WebTracerProvider();

const exporter = new OTLPTraceExporter({
	// Collector는 Docker 컨테이너지만, 브라우저는 로컬 PC에서 실행됩니다.
	// 따라서 localhost와 compose.yml에 노출된 포트(4318)를 사용합니다.
	url: "http://localhost:4318/v1/traces",
});

console.log("Provider object:", provider);
console.log("Type of addSpanProcessor:", typeof provider.addSpanProcessor);
console.log("Provider prototype:", Object.getPrototypeOf(provider));

provider.addSpanProcessor(new BatchSpanProcessor(exporter));
provider.register();

registerInstrumentations({
	instrumentations: [
		getWebAutoInstrumentations({
			// Fetch, XHR 요청을 자동으로 추적합니다.
			"@opentelemetry/instrumentation-fetch": {
				enabled: true,
			},
		}),
	],
});
