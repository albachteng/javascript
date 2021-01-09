// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }

  const pAequorFactory = (specimenNum, dna) => {
      return {
        specimenNum,
        dna,
        setSpecimenNum(number) {
            this.specimenNum = number;
            return this;
        },
        mutate() {
            let baseNumber = Math.floor(Math.random()*15);
            let randomBase = returnRandBase();
            if (this.dna[baseNumber] === randomBase) {
                this.mutate();
                return this;
            } else {
                this.dna[baseNumber] = randomBase;
                return this;
            }
        },
        compareDNA(pAequor) {
            let j = 0;
            for (let i = 0; i < this.dna.length; i++) {
                if (this.dna[i] === pAequor.dna[i]) {
                    j++;
                }
            }
            let percentage = Math.floor( j / this.dna.length * 100 );
            console.log(`Sample numbers ${this.specimenNum} and ${pAequor.specimenNum} share ${percentage}% of their DNA.`);
            return percentage;
        },
        willLikelySurvive() {
            let j = 0;
            for (let i = 0; i < this.dna.length; i++) {
                if (this.dna[i] === 'G' || this.dna[i] === 'C') {
                    j++;
                }
            }
            let percentage = Math.floor( j / this.dna.length * 100);
            if (percentage >= 60) {
                return true;
            } else {
                return false;
            }
        }
      }
      }
    
const createSurvivor = (num) => {
    let sample = pAequorFactory(num, mockUpStrand());
    if (!sample.willLikelySurvive()) {
        return createSurvivor(num);
    } else {
        return sample;
    }
}

const survivors = [];
for (let i = 0; i <= 30; i++) {
    survivors.push(createSurvivor(i));
}

// takes an index number and compares all of the other survivors to the corresponding specimen
const comparePercentages = (index) => {
    let percentages = [];
    for (let i = 0; i < survivors.length; i++) {
        if (i !== index) {
            percentages.push(survivors[index].compareDNA(survivors[i]));
        }}
        return Math.max(...percentages);
    }

console.log(comparePercentages(0));

// I could try improving this by returning an array with both sample numbers and the percentage
const compareAll = (array) => {
    let highestPercentages = [];
    for (let i = 0; i < array.length; i++) {
        highestPercentages.push(comparePercentages(i));
    }
    return Math.max(...highestPercentages); 
}

console.log(compareAll(survivors));