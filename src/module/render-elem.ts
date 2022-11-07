/**
 * @description render elem
 * @author wangfupeng
 */

import { h, VNode } from 'snabbdom'
import { DomEditor, IDomEditor, SlateElement } from '@wangeditor/editor'
import { AttachmentElement } from './custom-types'

function renderAttachment(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
  const isDisabled = editor.isDisabled()

  // 当前节点是否选中
  const selected = DomEditor.isNodeSelected(editor, elem)

  // 构建 vnode
  const { fileName = '', link = '' } = elem as AttachmentElement
  const vnode = h(
    'span',
    {
      props: {
        contentEditable: false, // 不可编辑
      },
      style: {
        display: 'inline-flex', // inline
        marginLeft: '3px',
        marginRight: '3px',
        alignItems: 'center',
        border:
          selected && !isDisabled
            ? '2px solid var(--w-e-textarea-selected-border-color)' // wangEditor 提供了 css var https://www.wangeditor.com/v5/theme.html
            : '2px solid transparent',
        borderRadius: '3px',
        padding: '0 3px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        cursor: isDisabled ? 'pointer' : 'inherit',
      },
      on: {
        // disable 时，点击下载附件
        click() {
          if (!isDisabled) return
          if (link) {
            window.open(link, '_blank')
          }
        },
      },
    },
    [
      h('img', {
        props: {
          src: 'data:image/png;base64,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',
        },
        style: {
          width: '1em',
          marginRight: '0.1em',
          minWidth: '0',
          minHeight: '0',
        },
      }),
      fileName,
    ]
  )

  return vnode
}

const conf = {
  type: 'attachment', // 节点 type ，重要！！！
  renderElem: renderAttachment,
}

export default conf
