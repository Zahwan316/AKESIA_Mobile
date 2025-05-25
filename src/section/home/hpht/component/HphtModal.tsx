import { JSX } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import ButtonComponent from "../../../../component/button";
import { MAIN_COLOR } from "../../../../constants/color";
import { sumHpht } from "../../../../utils/sumHpht";

type props = {
  visible: boolean,
  handleSendData: () => void,
  handleCancel: () => void,
  hpht: string,
}

const HphtModal = (props: props):JSX.Element => {
  return(
    <Modal
        visible={props.visible}
        transparent={true}
      >
        <View style={Style.modalBackground}>
          <View style={Style.modalContent}>
            <View style={{marginBottom: 16}}>
              <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginBottom: 8}}>Usia Kehamilan Mama Sekarang</Text>
              <Text style={{fontWeight: 'bold', fontSize: 30, textAlign: 'center', color: MAIN_COLOR, marginBottom: 10}}>Minggu {sumHpht(props.hpht)}</Text>
              <Text style={{fontWeight: 'normal', fontSize: 14, textAlign: 'center', color: '#303030'}}>Apakah informasi usia kehamilan sudah benar? Pastikan sekarang yuk, bu!</Text>
            </View>
            <View style={{width: '100%'}}>
              <ButtonComponent
                onPress={props.handleSendData}
                title="Sudah Benar"
                color={MAIN_COLOR}
                customstyle={{width: "100%", marginBottom: 12}}
              />
              <ButtonComponent
                onPress={props.handleCancel}
                title="Ubah Usia Kehamilan"
                color={MAIN_COLOR}
                customstyle={{width: "100%"}}
                outlined
              />
            </View>
          </View>

        </View>
      </Modal>
  );
};

const Style = StyleSheet.create({
  modalBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#10101030',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '38%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    paddingVertical: 22,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',

  },
});

export default HphtModal;
