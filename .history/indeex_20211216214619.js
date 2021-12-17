fs.createReadStream('song_list.csv')    
    .pipe(csv({}))
    .on('data', (data)=> results.push(data))
    .on('end', ()=>{
        const uppercased = results.map(name => name.Band.toUpperCase());
        console.log(uppercased);
        console.log('Canciones: ',results)
    });

    results.map(f=>{return f.toUpperCase();});