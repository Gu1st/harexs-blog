import { h, defineComponent, ref, nextTick } from 'vue';
import { list, add, del, modify } from '../../api/root/classify';
import { NInput } from 'naive-ui';

interface dataFace {
  id: string | number;
  class_name: string;
  updated_at?: string | Date;
  created_at?: string | Date;
}

export default function () {
  //数据源
  const data = ref<dataFace[]>([]);
  const className = ref('');

  //得到所有分类
  const getList = () => {
    const ListData = list();
    ListData.then(res => {
      data.value = res.data;
    });
  };

  //删除分类
  const delCate = id => {
    const ListDel = del(id);
    ListDel.then(() => {
      getList();
    });
  };

  //添加分类
  const addCate = () => {
    if (!className.value.trim()) {
      window.$message.warning('不允许分类名称为空');
      return;
    }
    const addRes = add(className.value);
    addRes.then(() => {
      className.value = '';
      getList();
    });
  };

  //修改分类
  const modifyCate = (id, className) => {
    modify(id, className);
  };

  //自定义组件
  const ShowOrEdit = defineComponent({
    props: {
      value: [String, Number],
      id: [String, Number],
      onUpdateValue: [Function, Array]
    },
    setup(props) {
      const isEdit = ref(false);
      const inputRef = ref();
      const inputValue = ref(props.value);
      function handleOnClick() {
        isEdit.value = true;
        nextTick(() => {
          inputRef.value.focus();
        });
      }
      function handleChange() {
        (props as any).onUpdateValue(inputValue.value);
        isEdit.value = false;
        modifyCate(props.id, inputValue.value);
      }
      return () =>
        h(
          'div',
          {
            onClick: handleOnClick
          },
          isEdit.value
            ? h(NInput as any, {
                ref: inputRef,
                value: inputValue.value,
                onUpdateValue: v => {
                  inputValue.value = v;
                },
                onBlur: handleChange
              })
            : props.value
        );
    }
  });

  return {
    data,
    className,
    getList,
    delCate,
    addCate,
    ShowOrEdit
  };
}
