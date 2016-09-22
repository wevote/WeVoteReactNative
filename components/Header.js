import NavigationBar from 'react-native-navbar'
import React, { Component, } from 'react'
import { View } from 'react-native'

const Header = (props) => <View>
                            <NavigationBar
                                title={{ title: "We Vote USA", tintColor: 'black', }}
                                style={{ backgroundColor: "#4F5F6F"}}
                                statusBar={{ tintColor: "rgba(251,252,255,1)", }}
                                />
                            </View>;

module.exports = Header;
