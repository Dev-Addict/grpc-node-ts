import {credentials} from '@grpc/grpc-js';

import {Language} from '../proto/com/language/v1/language_pb';
import {HelloServiceClient} from '../proto/services/hello/v1/hello_service_grpc_pb';
import {GreetRequest} from '../proto/services/hello/v1/hello_service_pb';

const client = new HelloServiceClient(
	'localhost:4000',
	credentials.createInsecure()
);

const request = new GreetRequest();

request.setName('Aria');
request.setLanguageCode(Language.Code.CODE_EN);

client.greet(request, (error, response) => {
	if (error) {
		console.error(error);

		process.exit(1);
	}

	console.info(response.getGreeting());
});
