import React from 'react'
import Job from './Job';

function Browse() {
    const randomJobs = [1, 2, 3, 4];
    return (
        <div className='max-w-7xl mx-auto '>
            <h1>Search Results {randomJobs.length}</h1>
            <div className='grid grid-cols-3 gap-4'>
                {
                    randomJobs.map((item, index) => {
                        return (
                            <Job key={index} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Browse