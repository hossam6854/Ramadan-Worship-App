
async function Test() {
    const response = await ("https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5");
    return (
        <div>
            <h1>Test</h1>
            <p>{response.data.timings.Fajr}</p>
        </div>
    )
}

test()