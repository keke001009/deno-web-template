import Comment from '/domain/entities/Comment.ts'

export const read = async () => {
    await Comment.all()
}

export const writeComment = async () => {
    return await Comment.create([
        {
            parentId : 6,
            content: 'test6'
        },
        {
            parentId : 6,
            content: 'test6'
        }
    ])
    const comment = new Comment()
    comment.parentId = 6
    comment.content = 'test6'
    return await comment.save()
}


export const readComments = async () => {
    const a = await Comment.where('parentId', '>',  '0')
    // a.table = 'comment as `a`'
    return Comment.leftJoin(Comment, Comment.field('id'), Comment.field('id')).get()
    // return await Comment.where('parentId', '>',  '0').select('content').get();
    // return await Comment.where('parentId', null).select('content').get();
    // return await Comment.join(Comment, Comment.field('id'), Comment1.field('parent_id')).get()
}