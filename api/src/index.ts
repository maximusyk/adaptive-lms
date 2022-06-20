import consola from 'consola';
import app from './app/app';
import connectMongo from './db/connection.db';

const PORT = process.env.PORT || process.env.API_PORT || 7070;

app.listen(PORT, () => {
    consola.success(`Server has been started on ${ PORT }`);

    connectMongo()
        .then(() => consola.success('MongoDB connected.'))
        .catch((err: string) => {
            consola.error(err);
            process.exit(1);
        });
});
