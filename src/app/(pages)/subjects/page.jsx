import { Button } from '@/components/ui/button'
import React from 'react'
import AddSubjectForm from './__components/AddSubjectForm'
import { DialogDemo } from './__components/DialogBasedForm'

const SubjectPage = () => {
  return (
    <>
        <section className='px-4'>
            <div className='flex justify-between '>
                <p className='text-2xl font-semibold'>
                    Subjects
                </p>
              <DialogDemo/>
            </div>
        </section>
    </>
  )
}

export default SubjectPage