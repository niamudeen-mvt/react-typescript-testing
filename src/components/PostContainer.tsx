import ThemeContainer from "./layout/ThemeContainer"

const PostContainer = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <ThemeContainer>
      <section
        className="flex justify-center py-32"
      >
        <div className="custom__container">
          {children}
        </div>
      </section>
    </ThemeContainer>
  )
}

export default PostContainer
