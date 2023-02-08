// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  //Fabric Function for our specimen
  const pAequorFactory = (number,array)=>{
    return{
      specimenNum: number,
      dna: array,
      mutate(){
        let dnaIndex = Math.floor(Math.random() * this.dna.length)
        //console.log(dnaIndex);
        let newBase = returnRandBase();
        //console.log('Actual Base: '+ this.dna[dnaIndex]);
        while(this.dna[dnaIndex] === newBase){
          newBase = returnRandBase();
          //console.log('New Base: '+newBase);
          }
        this.dna[dnaIndex]=newBase;
        return this.dna;
      },
      compareDNA(specimen){
        let equivalency = 0;
        for(let i = 0; i < this.dna.length; i++) {
          if(this.dna[i] === specimen.dna[i]) {
              equivalency++;
          }
        }
        let weight = equivalency / this.dna.length;
        let percentage = (weight * 100).toFixed(1);
        console.log(`Specimen #${this.specimenNum} and specimen #${specimen.specimenNum} have ${percentage}% DNA in common`)
        return `Specimen #${this.specimenNum} and specimen #${specimen.specimenNum} have ${percentage}% DNA in common`
      },
      willLikelySurvive(){
        const cOrG = this.dna.filter(el => el === 'C'|| el === 'G');
        return cOrG.length / this.dna.length >= 0.6;
      },
      complementStrand(){
        let comp = [];
        for(let i=0;i<this.dna.length;i++){
            switch (this.dna[i]){
                case 'A': 
                    comp.push('T')
                    break;
                case 'T': 
                    comp.push('A')
                    break;
                case 'C': 
                    comp.push('G')
                    break;
                case 'G': 
                    comp.push('C')
                    break;   

            }
        }
        return comp;
      }
    }
  }
  
  
  let newArr = [];
  let i=0;
  while(newArr.length<30){
    i++
    specimen = (pAequorFactory(i,mockUpStrand()));
    if(specimen.willLikelySurvive()){
      newArr.push(specimen)
    }
  }
  //console.log(newArr);
  
  specimenX = (pAequorFactory(999,mockUpStrand()));
  console.log(specimenX.dna);
  console.log(specimenX.complementStrand());
