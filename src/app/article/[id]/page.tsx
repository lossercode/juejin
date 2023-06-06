export default function Page({ params }: { params: { id: string } }) {
    const id = params.id
    return (
        <div>
            <div>点赞</div>
            <div>内容</div>
            <div>广告</div>
        </div>
    )
  }