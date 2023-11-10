import CategorySelector from '@components/CategorySelector';
import FileSelector from '@components/FileSelector';
import AppButton from '@ui/AppButton';
import {categories} from '@utils/categories';
import colors from '@utils/colors';
import React, {FC, useState} from 'react';
import {types} from 'react-native-document-picker';
import {DocumentPickerResponse} from 'react-native-document-picker';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as yup from 'yup';
import client from 'src/api/client';
import {getFromAsyncStorage, Keys} from '@utils/asyncStorage';
import Progress from '@ui/Progress';
import {mapRange} from '@utils/math';
import catchAsyncError from 'src/api/catchError';
import {updateNotification} from 'src/store/notification';
import {useDispatch} from 'react-redux';

interface FormFields {
  title: string;
  category: string;
  about: string;
  file?: DocumentPickerResponse;
  poster?: DocumentPickerResponse;
}

const defaultForm: FormFields = {
  title: '',
  category: '',
  about: '',
  file: undefined,
  poster: undefined,
};

const audioInfoSchema = yup.object().shape({
  title: yup.string().trim().required('Title is missing'),
  category: yup.string().oneOf(categories, 'Category is missing!'),
  about: yup.string().trim().required('About is missing'),
  file: yup.object().shape({
    uri: yup.string().required('Audio file is missing'),
    name: yup.string().required('Audio file is missing'),
    type: yup.string().required('Audio file is missing'),
    size: yup.number().required('Audio file is missing'),
  }),
  poster: yup.object().shape({
    uri: yup.string(),
    name: yup.string(),
    type: yup.string(),
    size: yup.number(),
  }),
});

interface Props {}

const Upload: FC<Props> = props => {
  const [showCategoryModel, setshowCategoryModel] = useState(false);
  const [audioInfo, setAudioInfo] = useState({...defaultForm});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();

  const handleUpload = async () => {
    try {
      setBusy(true);
      const finalData = await audioInfoSchema.validate(audioInfo);

      const formData = new FormData();

      formData.append('title', finalData.title);
      formData.append('about', finalData.about);
      formData.append('category', finalData.category);
      formData.append('file', {
        name: finalData.file.name,
        type: finalData.file.type,
        uri: finalData.file.uri,
      });
      if (finalData.poster.uri)
        formData.append('poster', {
          name: finalData.poster.name,
          type: finalData.poster.type,
          uri: finalData.poster.uri,
        });

      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      const {data} = await client.post('/audio/create', formData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data;',
        },
        onDownloadProgress(progressEvent) {
          const uploaded = mapRange({
            inputMin: 0,
            inputMax: progressEvent.total || 0,
            outputMin: 0,
            outputMax: 100,
            inputValue: progressEvent.loaded,
          });

          if (uploaded >= 100) {
            setAudioInfo({...defaultForm});
            setBusy(false);
          }

          setUploadProgress(Math.floor(uploaded));
        },
      });

      console.log(data);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
    setBusy(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.fileSelectorContainer}>
        <FileSelector
          icon={
            <MaterialComIcon
              name="image-outline"
              color={colors.SECONDARY}
              size={35}
            />
          }
          btnTitle="Select Poster"
          options={{type: [types.images]}}
          onSelect={poster => {
            setAudioInfo({...audioInfo, poster});
          }}
        />
        <FileSelector
          icon={
            <MaterialComIcon
              name="file-music-outline"
              color={colors.SECONDARY}
              size={35}
            />
          }
          btnTitle="Select Audio"
          style={{marginLeft: 30}}
          options={{type: [types.audio]}}
          onSelect={file => {
            setAudioInfo({...audioInfo, file});
          }}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Title"
          placeholderTextColor={colors.INACTIVE_CONSTRAST}
          style={styles.input}
          onChangeText={text => {
            setAudioInfo({...audioInfo, title: text});
          }}
          value={audioInfo.title}
        />

        <Pressable
          onPress={() => {
            setshowCategoryModel(true);
          }}
          style={styles.categorySelector}>
          <Text style={styles.categorySelectorTitle}>Category</Text>
          <Text style={styles.selectedCategory}>{audioInfo.category}</Text>
        </Pressable>
        <TextInput
          placeholderTextColor={colors.INACTIVE_CONSTRAST}
          placeholder="About"
          style={styles.input}
          numberOfLines={10}
          multiline
          onChangeText={text => {
            setAudioInfo({...audioInfo, about: text});
          }}
          value={audioInfo.about}
        />
        <CategorySelector
          visible={showCategoryModel}
          onRequestClose={() => {
            setshowCategoryModel(false);
          }}
          title="Category"
          data={categories}
          renderItem={item => {
            return <Text style={styles.category}>{item}</Text>;
          }}
          onSelect={item => {
            setAudioInfo({...audioInfo, category: item});
          }}
        />
        <View style={{marginVertical: 20}}>
          {busy ? <Progress progress={uploadProgress} /> : null}
        </View>
        <AppButton
          busy={busy}
          borderRaduis={7}
          title="Submit"
          onPress={handleUpload}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  fileSelectorContainer: {
    flexDirection: 'row',
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    padding: 10,
    fontSize: 18,
    color: colors.CONSTRAST,
    textAlignVertical: 'top',
  },
  category: {
    padding: 10,
    color: colors.PRIMARY,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  categorySelectorTitle: {
    color: colors.CONSTRAST,
  },
  selectedCategory: {
    color: colors.SECONDARY,
    marginLeft: 5,
    fontStyle: 'italic',
  },
});

export default Upload;
