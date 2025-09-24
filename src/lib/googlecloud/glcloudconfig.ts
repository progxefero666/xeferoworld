//src\lib\googlecloud\glcloudconfig.ts
'use server';


/*
export const serviceAccountCredentials = {
    "type": "service_account",
    "project_id": "astute-synapse-458518-c5",
    "private_key_id": "3fc4bb9c4716f53966fce854094685c735aaef20",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCcFRxJzwI3hOUX\nZhUS1yklHOLKvyauJ+ic27s0mNnDpTu3pC8Qhqyp7dS/WfqH5N4MXZCsgeJCFqBE\nDprWdjn5Nx0tzt6GUleAi69hgVxHoAYQXPJBUq4gBVTwkJnibA5aYHcF7OPVDZW4\nS352pV+o8JfYMLCBhmkStFJSOJ+SS0HcF5C/asl2vemd3bUctpTPfNI5G6/cKKzb\nGb0HNTNNp9rB8DwK96dYOpnZ4nH9HKL5THuzuPvDnRLaqBYkwBAGK4BqRBjiSTjU\nqCV5orakHOg9dOWYxcTceLv8i06V7HVn1c89vVQm9f/z1q+r6q9m6v+v7ovHiVar\nmQYuWpVbAgMBAAECggEAD8lQ0aRG2J+v3hR8mCm75x2LUK9Rtbain87XmePFzrR1\nHEdWXUkJyKwd4vayULFUxhJmkhQW8tFAB3IktgFCLtMkt9/fAN3uLLm0FNwVHcdx\nJZGJDRNUOjff1e8CKXT9ZKWyFB7YElHr7TZxhYWHbdpbuUl/aLJUCUjEtL02YoDi\nkCvRaMFxrmDzIfgqEVFQv5HwSkSBSx/JjwyOboqLoHb5gb/SU1Mr9+LTPV5ROHvf\nOzpvuCldVTuMx6XezQK3YWvwbdTjGR1eJU7B9G3MgWYo4eXJUPJZyIGvGQpsgXGf\nIpYJy/EzvLKI5GSgU+jw49Y2LCwLhTrMhdiwd0fK/QKBgQDWpI7JCAuj0fY1cKVG\n0YfUHXsJHiyFkqxLfK0T5uxSMpaX6NVz7smBBpRqYnE7Z0kMIOyxUqeLRnnhHyn9\n/WAha++5DQKWGX786zoSAQakqA/hdwAHPvqjj8tPNbJpBPLOFZLWAkL7+L/c++pq\n/HvyAnY6nc+XGpw3/3qAzzaQZQKBgQC6KANhNomOMqZQv+44DRCqEVryol33fsyW\n3YqXvissVtlWv6P/5IIP4LqhZC/6jnJBeCmbbnJ0sdwclGb2WHsWPeDLD7sriggx\nCIEgHMJE4SoKEzqPzkSuXl3/H2yGLWLCBRIVciB3WgRBBLmgpAdqsaLw5BN/Rqof\nKzaM8UrSvwKBgQC52d6wfsDlZiWTfCf/u+mqZqRj7raKKcf5zMhoVSkGuzrd6gL4\n0Se1Cqdzvi1hTDtZvyBzIahk1e8uWDeZ7sxP5A+74WH96bGk+WBcunqwE708cjea\nDpQjD5zwxwPmHxzGCLQNjgPF/UrT42TEoj4H/M22T3Kx2Z6udg3yfnk2aQKBgHKd\ntk8BhDogJ1Sqh6LNMIh1vRiNLev3j0IIT4/UT8KyCokl33TrncTm6iH6jKvpTqHO\nuVdw7lm5NLwIB0j/+3EbUi/UlLpe92IxSUebTWWZeQfRBQqLxq/RfHBbSbdndFnf\nQ14e8axqqRnbLeuhcsuXaaqF0xdXS+F6+tBWtGoDAoGAOpVC6RkwaiuQyX2iPnUn\nirHFtpaIX3UFe7zBs3iQd0Ri2Gd7ef+U9Ggy0KS4E7m51bP39EJyjA+JrcIfZZLw\nLb73XZowb4d4FNidCfne/80m0zgfhnSFb0WF6WQaosDk65D97o6MnSUl0TqI978Q\nNH8ID+ivQAIrNu26xDvr2DM=\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
    "client_email": "mtools-service@astute-synapse-458518-c5.iam.gserviceaccount.com",
    "client_id": "106401579815627667124",
};

*/
const apiKey:string|undefined = process.env.OPENAI_API_KEY;

export const serviceAccountCredentials = {
    "type": "service_account",
    "project_id": "astute-synapse-458518-c5",
    "private_key_id": "3fc4bb9c4716f53966fce854094685c735aaef20",
    "private_key": process.env.OPENAI_API_KEY,
    "client_email": "mtools-service@astute-synapse-458518-c5.iam.gserviceaccount.com",
    "client_id": "106401579815627667124",
};
