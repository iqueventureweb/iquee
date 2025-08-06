'use client'
import { useField } from '@payloadcms/ui'
import { UIFieldServerComponent, UIFieldServerProps } from 'payload'

const HtmlContent: UIFieldServerComponent = (props: UIFieldServerProps) => {
  const { value } = useField({
    path: 'html_content',
  })
  return (
    <div
      style={{
        padding: '1.5rem',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        background: 'black',
        minHeight: '200px',
        fontFamily: 'inherit',
        fontSize: '1rem',
        color: '#c2c2c2',
        overflowX: 'auto',
      }}
      dangerouslySetInnerHTML={{ __html: value || '<em>No content</em>' }}
    />
  )
}

export default HtmlContent
