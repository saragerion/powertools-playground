import { Logger } from "@aws-lambda-powertools/logger";
import { LambdaInterface } from "@aws-lambda-powertools/commons";
import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { setTimeout } from "timers";

const logger = new Logger({
    logLevel: "DEBUG",
    persistentLogAttributes: {
        foo: "bar",
        biz: "baz",
    },
});

class Lambda implements LambdaInterface {
    // Enable the clear state flag
    @logger.injectLambdaContext({ clearState: true })
    public async handler(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
        logger.appendKeys({ temporaryState: true });
        logger.debug("This is a DEBUG log # 1, should contain temporary state");
        await this.doSomethingAsync();
        logger.debug("This is a DEBUG log # 2, should contain temporary state");

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world',
            }),
        };
    }

    private async doSomethingAsync(): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, 1 * 1000));
    }
}

const myFunction = new Lambda();
export const handler = myFunction.handler.bind(myFunction);