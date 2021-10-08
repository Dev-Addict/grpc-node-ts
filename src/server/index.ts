import {
	ServerUnaryCall,
	sendUnaryData,
	Server,
	ServerCredentials,
} from '@grpc/grpc-js';

import {Language} from '../proto/com/language/v1/language_pb';
import {
	GreetRequest,
	GreetResponse,
} from '../proto/services/hello/v1/hello_service_pb';
import {HelloServiceService} from '../proto/services/hello/v1/hello_service_grpc_pb';

const greet = (
	call: ServerUnaryCall<GreetRequest, GreetResponse>,
	callback: sendUnaryData<GreetResponse>
) => {
	const response = new GreetResponse();

	switch (call.request.getLanguageCode()) {
		case Language.Code.CODE_FA:
			response.setGreeting(`سلام، ${call.request.getName()}`);
			break;
		case Language.Code.CODE_UNSPECIFIED:
		case Language.Code.CODE_EN:
		default:
			response.setGreeting(`Hello, ${call.request.getName()}`);
	}

	callback(null, response);
};

const server = new Server();

server.addService(HelloServiceService, {greet});

server.bindAsync('0.0.0.0:4000', ServerCredentials.createInsecure(), () => {
	server.start();

	console.log('server is running on 0.0.0.0:4000');
});
