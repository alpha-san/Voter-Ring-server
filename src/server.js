import Server from 'socket.io';

export default function startServer() {

    // create http server at port 8090
    const io = new Server().attach(8090);

    // update the state whenever there is a change
    store.subscribe(
      () => io.emit('state', store.getState().toJS())
    );

    // TODO add more security and validation for different types of users
    io.on('connection', (socket) => {
        // send update to state
        socket.emit('state', store.getState().toJS());

        // get updated state whenever change occurs
        socket.on('action', store.dispatch.bind(store));
    });
}
