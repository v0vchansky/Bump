interface IPollingOptions {
    requestUpdateUserLocation: VoidFunction;
}

enum PollingManagerState {
    Idle,
    InProgress,
}

export const createUserLocationPollingManager = (options: IPollingOptions) => {
    let timer: NodeJS.Timer;

    let state: PollingManagerState = PollingManagerState.Idle;

    const controls = {
        start: () => {
            if (state === PollingManagerState.Idle) {
                state = PollingManagerState.InProgress;

                options.requestUpdateUserLocation();

                timer = setInterval(() => {
                    options.requestUpdateUserLocation();
                }, 5000);
            }
        },
        stop: () => {
            state = PollingManagerState.Idle;

            if (timer) {
                clearInterval(timer);
            }
        },
    };

    return controls;
};
