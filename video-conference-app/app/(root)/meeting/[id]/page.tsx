const Meeting = ({ params }: {params: { id: string }}) => {
  return (
    <div>
      Meeting Id is # {params.id}
    </div>
  )
}

export default Meeting;